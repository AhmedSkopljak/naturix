import Product from "../models/Product.js";
import Order from "../models/Order.js";
import stripe from "stripe";
import User from "../models/User.js";

//Place order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try{
        const {userId, items, address} = req.body;
        if (!address || items.length === 0) {
            return res.json({success: false, message: "Invalid Data"})
        }

        //Calculate amount using items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        //Add tax charge 2%
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({success: true, message: "Order created successfully"})
    }catch(error){
        return res.json({success: false, message: error.message})
    }
}

//Place order Stripe: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try{
        const {userId, items, address} = req.body;
        const {origin} = req.headers;

        if (!address || items.length === 0) {
            return res.json({success: false, message: "Invalid Data"})
        }
        let productData = [];

        //Calculate amount using items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        //Add tax charge 2%
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        //stripe gateway initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price*0.02)*100
                },
                quantity: item.quantity,
            }
        });

        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({success: true, url: session.url});
    }catch(error){
        return res.json({success: false, message: error.message})
    }
}
//Stripe webhooks to verify payments action : /stripe
export const stripeWebhooks = async (req, res) => {
    // 1. Inicijalizacija Stripe-a
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];
    let event;

    // 2. Verifikacija potpisa (MORAš imati raw body u middleware-u)
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook verifikacija greška:", error.message);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // 3. Logiranje za lakši debugging
    console.log(`Stigao Stripe event: ${event.type}`);

    // 4. Obrada eventa
    switch (event.type) {
        // Koristimo checkout.session.completed jer sesija sadrži SVE podatke (i metadata)
        case "checkout.session.completed": {
            const session = event.data.object;
            const { orderId, userId } = session.metadata;

            console.log(`Potvrda plaćanja za narudžbu: ${orderId}`);

            // Ažuriraj narudžbu u bazi
            const order = await Order.findByIdAndUpdate(
                orderId,
                { isPaid: true },
                { new: true }
            );

            // Očisti korpu ako je narudžba pronađena
            if (order) {
                await User.findByIdAndUpdate(userId, { cartItems: {} });
                console.log("Narudžba uspješno ažurirana i korpa očišćena.");
            }
            break;
        }

        // Ako plaćanje nije prošlo (npr. odbijena kartica), obriši narudžbu
        case "checkout.session.expired":
        case "checkout.session.async_payment_failed": {
            const session = event.data.object;
            const { orderId } = session.metadata;
            console.log(`Plaćanje nije uspjelo za order: ${orderId}. Brišem narudžbu.`);
            await Order.findByIdAndDelete(orderId);
            break;
        }

        default:
            console.log(`Ignoriran event: ${event.type}`);
    }

    // 5. Uvijek vrati odgovor Stripe-u
    res.json({ received: true });
}
//Get orders by userId: /api/order/user
export const getUserOrders = async (req, res) => {
    try{
        const {userId} = req.body;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({ createdAt: -1 })

        res.json({success:true, orders})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

//Get all orders (admin): /api/order/seller
export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({ createdAt: -1 })

        res.json({success:true, orders})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

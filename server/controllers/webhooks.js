const { Webhook } = require("svix");
require("dotenv").config();
const User = require("../models/User");

//API COntroller Function to Manage Clerk User with Database

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };

        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        const user = await User.findOne({ _id: data.id });
        if (user) {
          await User.updateOne({ _id: data.id }, { $set: userData });
          res.json({});
        }
        break;
      }
    }
  } catch (error) {}
};

module.exports = clerkWebhooks;

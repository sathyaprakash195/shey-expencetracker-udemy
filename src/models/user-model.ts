import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    incomeCategories: {
      type: Array,
      required: true,
      default: ["salary", "bonus", "interest", "dividend", "other"],
    },
    expenseCategories: {
      type: Array,
      required: true,
      default: [
        "food",
        "transportation",
        "shopping",
        "housing",
        "entertainment",
        "health",
        "insurance",
        "education",
        "donation",
        "utility",
        "other",
      ],
    },
  },
  { timestamps: true }
);

// delete model if it exists
if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;

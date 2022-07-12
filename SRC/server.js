const mongoose = require("mongoose");

const connection = () => {
  return mongoose.connect("mongodb://localhost:27017/practice", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const company = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
  },
  name: {
    type: String,
    required: true,
  },
  employes: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
  },

  debts: {
    type: Number,
    default: 0,
  },
  associates: [{ type: mongoose.Schema.Types.ObjectId, ref: "company" }],
});

//Indexes

company.index(
  {
    city: 1,
    name: 1,
  },
  { unique: true }
);

company.virtual("total").get(function () {
  const total = this.budget - this.debts;
  return total;
});

const Company = mongoose.model("company", company);

company.post("update", async function (doc, next) {
  console.log("After All");
  await Company.findOneAndRemove({
    budget: { $lt: 900 },
  }).exec();
  next();
});

connection().then(async () => {
  const associates = await Company.find({
    budget: { $gt: 800 },
  })
    .populate("associates")
    .exec();

  // const myCom = await Company.create({
  //   name: "Oraeas S.A",
  //   employes: 2000,
  //   budget: 1200,
  //   debts: 900,
  // });

  // const match = await Company.find({}).populate("associates").exec();
  // const all = await Company.find({}).exec();
  console.log(associates);
});

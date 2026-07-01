import chalk from "chalk";
import path from "node:path";

const submissionController = async (req, res) => {
  try {
    const userId = req.id;
    const subId = req.params.submissionId;

    // console.log(
    //   "userId: ",
    //   chalk.red(userId),
    //   " submissionId:",
    //   subId,
    // );

    return res.status(200).json({
      userId,
      submissionId: subId,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        message: "Internal sever error/ submission controllers",
        // err: error.message
    })
  }
};

export { submissionController };

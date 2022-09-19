import { Context } from "./context";
import { StudentModel as Student } from "../model/student.model";

export const index = ({ redis }: Context) => {
  return async (req: any, res: any) => {
    const students = await redis.get("students", (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (students) {
      console.log("Cache hit");
      return res.json({
        status: "success",
        message: "Students retrieved successfully",
        data: JSON.parse(students),
      });
    }

    console.log("Cache miss");
    Student.find(async (err, students) => {
      if (err) {
        return res.status(404).json({
          status: "error",
          message: err,
        });
      }
      if (students) {
        await redis.setex("students", 60, JSON.stringify(students));
      }
      res.status(200).json({
        status: "success",
        message: "Students retrieved successfully",
        data: students,
      });
    });
  };
};

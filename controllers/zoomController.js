const ZoomModel = require("../models/zoomModel");
const LessonController = require("./lessonController");

class ZoomController {
  static async addZoom(sn, ltsStr, link) {
    try {
      const lts = ltsStr.split(", ");
      const zooms = [];
      for (const lt of lts) {
        const lesson = await LessonController.findOneLesson({
          shortName: sn,
          type: lt,
        });
        if (!lesson) return false;
        zooms.push({
          link: link,
          lesson: lesson,
        });
      }
      await ZoomModel.create(zooms);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  static async find() {
    try {
      return await ZoomModel.find().populate("lesson");
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    try {
      return (await ZoomModel.findById(id))?.link || "немає";
    } catch (err) {
      console.log(err);
      return "помилка";
    }
  }

  static async findZoom(lesson) {
    try {
      return (await ZoomModel.findOne({ lesson: lesson })?.link) || "немає";
    } catch (err) {
      console.log(err);
      return "немає";
    }
  }
}

module.exports = ZoomController;

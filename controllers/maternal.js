const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Maternal = require("../models/Maternal");

// @desc    Create Frontdesk
// @route   POST/api/v1/frontdesk/
// @access   Private/Admin
exports.createMaternal = asyncHandler(async (req, res, next) => {
  req.body.user = req.sadmin.id;
  req.body.location = req.sadmin.location ? req.sadmin.location : undefined;
  const exist = await Maternal.findOne({
    location: req.sadmin.location,
  });
  if (exist) {
    const records = exist.records;
    const update = [
      {
        date: req.body.date,
        month: req.body.month,
        year: req.body.year,
        bedComplementBed: req.body.bedComplementBed,
        bedComplementOther: req.body.bedComplementOther,
        totalAdmissions: req.body.totalAdmissions,
        totalDischarges: req.body.totalDischarges,
        bba: req.body.bba,
        pncSession: req.body.pncSession,
        pncAttendance: req.body.pncAttendance,
        casualtyAttendances: req.body.casualtyAttendances,
        newBooking: req.body.newBooking,
        oldBooking: req.body.oldBooking,
        ancAttendance: req.body.ancAttendance,
        clinicAttendances: req.body.clinicAttendances,
        familyPlanning: req.body.familyPlanning,
        deliveries: req.body.deliveries,
        bookedCases: req.body.bookedCases,
        unbookedCases: req.body.unbookedCases,
        singlesDelivered: req.body.singlesDelivered,
        twinsDelivered: req.body.twinsDelivered,
        tripletsDelivered: req.body.tripletsDelivered,
        threePlus: req.body.threePlus,
        normalDeliveries: req.body.normalDeliveries,
        forcepsDeliveries: req.body.forcepsDeliveries,
        breechDeliveries: req.body.breechDeliveries,
        caesareanDeliveries: req.body.caesareanDeliveries,
        births: req.body.births,
        liveBirthsMale: req.body.liveBirthsMale,
        liveBirthsFemale: req.body.liveBirthsFemale,
        stillBirthsMale: req.body.stillBirthsMale,
        stillBirthsFemale: req.body.stillBirthsFemale,
        natalDeaths: req.body.natalDeaths,
        MBookedCase: req.body.MBookedCase,
        MUBookedCase: req.body.MUBookedCase,
        maternalBID: req.body.maternalBID,
        spontaneousAbortion: req.body.spontaneousAbortion,
        inducedAbortion: req.body.inducedAbortion,
        otherAbortion: req.body.otherAbortion,
        abortionCases: req.body.abortionCases,
      },
    ];
    records.push(...update);
    await Maternal.findByIdAndUpdate(
      exist._id,
      {
        records: records,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      success: true,
    });
  } else {
    const records = [];

    const update = [
      {
        date: req.body.date,
        month: req.body.month,
        year: req.body.year,
        bedComplementBed: req.body.bedComplementBed,
        bedComplementOther: req.body.bedComplementOther,
        totalAdmissions: req.body.totalAdmissions,
        totalDischarges: req.body.totalDischarges,
        bba: req.body.bba,
        pncSession: req.body.pncSession,
        pncAttendance: req.body.pncAttendance,
        casualtyAttendances: req.body.casualtyAttendances,
        newBooking: req.body.newBooking,
        oldBooking: req.body.oldBooking,
        ancAttendance: req.body.ancAttendance,
        clinicAttendances: req.body.clinicAttendances,
        familyPlanning: req.body.familyPlanning,
        deliveries: req.body.deliveries,
        bookedCases: req.body.bookedCases,
        unbookedCases: req.body.unbookedCases,
        singlesDelivered: req.body.singlesDelivered,
        twinsDelivered: req.body.twinsDelivered,
        tripletsDelivered: req.body.tripletsDelivered,
        threePlus: req.body.threePlus,
        normalDeliveries: req.body.normalDeliveries,
        forcepsDeliveries: req.body.forcepsDeliveries,
        breechDeliveries: req.body.breechDeliveries,
        caesareanDeliveries: req.body.caesareanDeliveries,
        births: req.body.births,
        liveBirthsMale: req.body.liveBirthsMale,
        liveBirthsFemale: req.body.liveBirthsFemale,
        stillBirthsMale: req.body.stillBirthsMale,
        stillBirthsFemale: req.body.stillBirthsFemale,
        natalDeaths: req.body.natalDeaths,
        MBookedCase: req.body.MBookedCase,
        MUBookedCase: req.body.MUBookedCase,
        maternalBID: req.body.maternalBID,
        spontaneousAbortion: req.body.spontaneousAbortion,
        inducedAbortion: req.body.inducedAbortion,
        otherAbortion: req.body.otherAbortion,
        abortionCases: req.body.abortionCases,
      },
    ];
    records.push(...update);
    req.body.records = records;
    await Maternal.create(req.body);
    res.status(201).json({
      success: true,
    });
  }
});

// @desc    Get ALl Location
// @route   POST/api/v1/location
// @access   Private/Admin
exports.getMaternal = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

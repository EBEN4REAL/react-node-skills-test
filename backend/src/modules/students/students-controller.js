const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const payload = req.query;
    const students = await getAllStudents(payload);
    res.json({ students });
});


const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const { message } = await addNewStudent(payload);
    res.json({ message });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    payload.mode = "update"
    payload.userId = req.params.id;
    const { message } = await updateStudent(payload);
    res.json({ message });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const payload = req.body;
    payload.userId = userId;
    payload.reviewerId = reviewerId;
    const { message } = await setStudentStatus(payload);
    res.json({ message });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};

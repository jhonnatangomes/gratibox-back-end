export default function databaseError(res, error) {
    console.error(error);
    return res
        .status(500)
        .send('Internal server error. Please try again later.');
}

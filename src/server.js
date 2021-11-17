import app from './app.js';

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
	console.log(`Server running at ${process.env.NODE_ENV} mode`);
});

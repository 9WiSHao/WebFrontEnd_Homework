module.exports = function (content) {
	let newContent = content.replace(/const/g, 'var');
	return newContent;
};

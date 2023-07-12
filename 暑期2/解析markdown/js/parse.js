class Parser {
	constructor() {
		this.heading = /^(#{1,6}\s+)/;
		this.blockQuote = /^(\>\s+)/;
		this.unorderedList = /^((\*|-){1}\s+)/;
		this.image = /\!\[(.*?)\]\((.*?)\)/g;
		this.strongText = /\*{2}(.*?)\*{2}/g;
		this.codeLine = /\`{1}(.*?)\`{1}/g;
		// TODO: 补充分割符正则
		this.hr = /^-{3,}$/;
		this.currentBlockQuote = null;
		this.currentUnorderedList = null;
	}

	// 获取单行内容
	parseLineText(lineText) {
		this.lineText = lineText;
	}

	// 是否是空行
	isEmptyLine() {
		return this.lineText === '';
	}

	// 是否为符合标题规范
	isHeading() {
		return this.heading.test(this.lineText);
	}

	//判断是否为hr
	isHr() {
		return this.hr.test(this.lineText);
	}

	// 解析标题
	parseHeading() {
		const temp = this.lineText.split(' ');
		const headingLevel = temp[0].length;
		const title = temp[1].trim();
		return `<h${headingLevel}>${title}</h${headingLevel}>`;
	}

	/**
	 * TODO: 请完成剩余各种语法的解析
	 *   1. 完成对分隔符的解析
	 *   2. 完成对引用区块的解析
	 *   3. 完成对无序列表的解析
	 *   4. 完成对图片，和文字效果的解析
	 */
	parseHr() {
		return `<hr />`;
	}

	// 2. 引用区块
	isBlockQuote(lineText) {
		// 传参的话就是判断传入行（只会传下一行）
		if (lineText !== undefined) {
			return this.blockQuote.test(lineText);
		}
		return this.blockQuote.test(this.lineText);
	}
	parseBlockQuote() {
		let text = this.lineText.replace(this.blockQuote, '');
		return `<p>${text}</p>`;
	}

	// 3. 无序列表
	isUnorderedList(lineText) {
		// 由于顶部底部需要ul标签，所以同理，要传入下一行判断
		if (lineText !== undefined) {
			return this.unorderedList.test(lineText);
		}
		return this.unorderedList.test(this.lineText);
	}
	parseUnorderedList() {
		let text = this.lineText.replace(this.unorderedList, '');
		return `<li>${text}</li>`;
	}

	// 4. 图片
	isImage() {
		// 因为正则带g
		this.image.lastIndex = 0;
		return this.image.test(this.lineText);
	}
	parseImage() {
		this.image.lastIndex = 0;
		const temp = this.image.exec(this.lineText);
		if (temp !== null) {
			const alt = temp[1];
			const src = temp[2];
			return `<img src="${src}" alt="${alt}" />`;
		}
		return '';
	}

	// 5. 粗体和行内代码
	// 没整明白，先不弄了
}

class Reader {
	constructor(text) {
		//获取全部原始文本
		this.text = text;
		this.lines = this.getLines();
		this.parser = new Parser();
	}

	runParser() {
		let currentLine = 0;
		let hasParsed = [];

		while (!this.reachToEndLine(currentLine)) {
			// 获取行文本
			this.parser.parseLineText(this.getLineText(currentLine));

			// 判断空白行
			if (this.parser.isEmptyLine()) {
				currentLine++;
				continue;
			}

			if (this.parser.isHeading()) {
				hasParsed.push(this.parser.parseHeading());
				currentLine++;
				continue;
			}
			// TODO: 请完成剩余各种语法的解析
			if (this.parser.isHr()) {
				hasParsed.push(this.parser.parseHr());
				currentLine++;
				continue;
			}

			// 2. 引用区块
			if (this.parser.isBlockQuote()) {
				if (this.parser.currentBlockQuote === null) {
					this.parser.currentBlockQuote = this.parser.parseBlockQuote();
				} else {
					this.parser.currentBlockQuote += this.parser.parseBlockQuote();
				}

				// 查看下一行是否还是引用行
				if (this.reachToEndLine(currentLine + 1) || !this.parser.isBlockQuote(this.getLineText(currentLine + 1))) {
					hasParsed.push(`<blockquote>${this.parser.currentBlockQuote}</blockquote>`);
					this.parser.currentBlockQuote = null;
				}
				currentLine++;
				continue;
			}

			// 3. 无序列表,因为开头结尾要套ul,和上面只能说完全一致
			if (this.parser.isUnorderedList()) {
				if (this.parser.currentUnorderedList === null) {
					this.parser.currentUnorderedList = this.parser.parseUnorderedList();
				} else {
					this.parser.currentUnorderedList += this.parser.parseUnorderedList();
				}

				// 查看下一行是否还是引用行
				if (this.reachToEndLine(currentLine + 1) || !this.parser.isUnorderedList(this.getLineText(currentLine + 1))) {
					hasParsed.push(`<ul>${this.parser.currentUnorderedList}</ul>`);
					this.parser.currentUnorderedList = null;
				}
				currentLine++;
				continue;
			}

			// 4. 图片
			if (this.parser.isImage()) {
				hasParsed.push(this.parser.parseImage());
				currentLine++;
				continue;
			}

			// 5. 粗体和行内代码
			// 没整明白，先不弄了

			// 最后得有个啥也不带的普通文字输出
			hasParsed.push(`<p>${this.getLineText(currentLine)}</p>`);
			currentLine++;
		}

		return hasParsed.join('');
	}

	getLineText(lineNum) {
		return this.lines[lineNum];
	}

	getLines() {
		this.lines = this.text.split('\n');
		return this.lines;
	}

	reachToEndLine(line) {
		return line >= this.lines.length;
	}
}

module.exports = function parseMarkdown(markdownContent) {
	return new Reader(markdownContent).runParser();
};

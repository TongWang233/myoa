function Up(formName, InputFileName, InputImgName) {

	window.open('/oa1/common/Up.jsp?formName=' + formName + '&InputImgName='
			+ InputImgName + '&InputFileName=' + InputFileName, '文件上传',
			'width=200, height=100, scrollbars=no');

}

var $GetFromAllElement = function(frm, objectName) {
	var sHTML = "";

	try {
		for ( var i = 0; i <= frm.elements.length - 1; i++) {
			var e = frm.elements[i];

			if ((e.type == 'checkbox') && (e.checked) && (e.name == objectName)) {
				if (sHTML.length == 0) {
					sHTML = e.value;
				} else {
					sHTML += "," + e.value;
				}
			}
		}
	} catch (e) {
		return (sHTML);
	}

	return (sHTML);
};

var $CHKBoxALL = function(oForm, object, oViewType) {
	try {
		for ( var i = 0; i < oForm.elements.length; i++) {
			var e = oForm.elements[i];
			if (e.type == 'checkbox') {
				if (object.checked) {
					e.checked = true;

					if (oViewType != '')
						oViewType.style.display = '';
				} else {
					e.checked = false;

					if (oViewType != '')
						oViewType.style.display = 'none';
				}
			}
		}
	} catch (e) {
		alert('error: ' + e);
	}
};

//��ʾѡ��
var $MC = function(message) {
	try {
		return confirm(message);
	} catch (e) {
		alert('error: ' + e);

		return false;
	}
};

var $FrmSub = function(frm, objectname) {
	try {

	} catch (e) {
		alert('error: ' + e);
		return false;
	}
};

//删除页面记录方法
var $FrmSub = function(frm, objectname, message) {
	try {
		var value = $GetFromAllElement(frm, objectname);
		if (value.length == 0) {
			alert("请选择记录再操作！");
			return false;
		}
		return $MC("你确定" + message + "吗?");
		return true;
	} catch (e) {
		alert('error: ' + e);
		return false;
	}
};

//删除页面记录方法(标记删除)
var $FrmSubDel = function(frm, objectname, message, actionStr) {
	try {
		var value = $GetFromAllElement(frm, objectname);
		if (value.length == 0) {
			alert("请选择记录再操作！");
			return false;
		}
		var result = $MC("你确定" + message + "吗?");
		if (result == true) {
			frm.action = actionStr; //更改action的值
		}
		return result;
		return true;
	} catch (e) {
		alert('error: ' + e);
		return false;
	}
};

//验证修改功能 
var $GetCheckBoxSel = function(frm, objectName, actionStr) {
	var js = 0;

	try {
		var obj = document.getElementsByName(objectName)
		for ( var i = 0; i < obj.length; i++) {
			if (obj[i].checked == true) {//选中
				js = js + 1;
			}
		}
	} catch (e) {
		js = 0
		alert('error: ' + e);
	}

	if (js == 0) {
		alert('请选择要修改的记录！');
		return false;
	}

	if (js > 1) {
		alert('只能选中一条记录！');
		return false;
	}

	if (js == 1) {
		frm.action = actionStr; //更改action的值
	}

};

//选择所有可用的未被选择的复选框
var $CHKBoxALLIfNotDisabled = function(oForm, object, oViewType) {
	try {
		for ( var i = 0; i < oForm.elements.length; i++) {
			var e = oForm.elements[i];
			if (e.type == 'checkbox' && e.disabled != true)
				//  if(e.disabled!=false){
				if (object.checked) {
					e.checked = true;

					if (oViewType != '')
						oViewType.style.display = '';
				} else {
					e.checked = false;

					if (oViewType != '')
						oViewType.style.display = 'none';
				}
		}
	} catch (e) {
		alert('error: ' + e);
	}
};
/**
 * 得到浏览器窗口的高度
 */
function getBrowserHeight() {
	var bodyfrm = (document.compatMode.toLowerCase() == "css1compat") ? document.documentElement
			: document.body;
	return bodyfrm.clientHeight;
}

/**
 * 金额转换
 * @param {} dValue 输入
 * @param {} maxDec 最大小数位数
 * @return {String} 
 */
function AmountInWords(dValue, maxDec) {
	// 验证输入金额数值或数值字符串：
	dValue = dValue.toString().replace(/,/g, "");
	dValue = dValue.replace(/^0+/, ""); // 金额数值转字符、移除逗号、移除前导零
	if (dValue == "") {
		return "";
	} // （错误：金额为空！）
	else if (isNaN(dValue)) {
		return "错误：金额不是合法的数值！";
	}

	var minus = ""; // 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。
	var CN_SYMBOL = ""; // 币种名称（如“人民币”，默认空）
	if (dValue.length > 1) {
		if (dValue.indexOf('-') == 0) {
			dValue = dValue.replace("-", "");
			minus = "负";
		} // 处理负数符号“-”
		if (dValue.indexOf('+') == 0) {
			dValue = dValue.replace("+", "");
		} // 处理前导正数符号“+”（无实际意义）
	}

	// 变量定义：
	var vInt = "";
	var vDec = ""; // 字符串（数字）：金额的整数部分、小数部分
	var resAIW; // 字符串（大写汉字）：存储输出的结果的整数部分
	var resDec; // 字符串（大写汉字）：存储输出的结果的小数部分
	var parts; // 数组（整数部分.小数部分），length=1时则仅为整数。
	var digits, radices, bigRadices, decimals; // 数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币（元以下，角/分/厘/毫/丝）。
	var zeroCount; // 零计数
	var i, p, d; // 循环因子；前一位数字；当前位数字。
	var quotient, modulus; // 整数部分计算用：商数、模数。

	// 金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。
	var NoneDecLen = (typeof (maxDec) == "undefined" || maxDec == null
			|| Number(maxDec) < 0 || Number(maxDec) > 5); // 是否未指定有效小数位（true/false）
	parts = dValue.split('.'); // 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。
	if (parts.length > 1) {
		vInt = parts[0];
		vDec = parts[1]; // 变量赋值：金额的整数部分、小数部分

		if (NoneDecLen) {
			maxDec = vDec.length > 5 ? 5 : vDec.length;
		} // 未指定有效小数位参数值时，自动取实际小数位长但不超5。
		var rDec = Number("0." + vDec);
		rDec *= Math.pow(10, maxDec);
		rDec = Math.round(Math.abs(rDec));
		rDec /= Math.pow(10, maxDec); // 小数四舍五入
		var aIntDec = rDec.toString().split('.');
		if (Number(aIntDec[0]) == 1) {
			vInt = (Number(vInt) + 1).toString();
		} // 小数部分四舍五入后有可能向整数部分的个位进位（值1）
		if (aIntDec.length > 1) {
			vDec = aIntDec[1];
		} else {
			vDec = "";
		}
	} else {
		vInt = dValue;
		vDec = "";
		if (NoneDecLen) {
			maxDec = 0;
		}
	}
	if (vInt.length > 44) {
		return "错误：金额值太大了！整数位长【" + vInt.length.toString()
				+ "】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！";
	}

	// 准备各字符数组 Prepare the characters corresponding to the digits:
	digits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); // 零~玖
	radices = new Array("", "拾", "佰", "仟"); // 拾,佰,仟
	bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰", "沟", "涧", "正"); // 万,亿,兆,京,垓,杼,穰,沟,涧,正
	decimals = new Array("角", "分", "厘", "毫", "丝"); // 角/分/厘/毫/丝

	resAIW = ""; // 开始处理
	resDec = "";
	// 处理整数部分（如果有）
	if (Number(vInt) > 0) {
		zeroCount = 0;
		for (i = 0; i < vInt.length; i++) {
			p = vInt.length - i - 1;
			d = vInt.substr(i, 1);
			quotient = p / 4;
			modulus = p % 4;
			if (d == "0") {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					resAIW += digits[0];
				}
				zeroCount = 0;
				resAIW += digits[Number(d)] + radices[modulus];
			}
			if (modulus == 0 && zeroCount < 4) {
				resAIW += bigRadices[quotient];
			}
		}
		resAIW += "元";
	}
	if (Number(vDec) > 0) {
		//alert(typeof vDec);//-------------------------------------------------------
		for (i = 0; i < vDec.length; i++) {
			//var temp_dec=vDec.charAt(i);
			if (vDec.charAt(i) != 0) {
				resDec = resDec + digits[vDec.charAt(i)] + decimals[i];
			} else {//当前为0
				if (i == 0) {
					if (i < vDec.length - 1) {//如果后面也不为0
						if (vDec.charAt(i + 1) != 0) {
							resDec += digits[0];
						}
					}
				} else if (vDec.charAt(i - 1) != 0) {//前面不为0
					if (i < vDec.length - 1) {//如果后面也不为0
						if (vDec.charAt(i + 1) != 0) {
							resDec += digits[0];
						}
					}
				} else if (vDec.charAt(i - 1) == 0) {//前面为0
					if (i < vDec.length - 1) {//如果后面不为0
						if (vDec.charAt(i + 1) != 0) {
							resDec += digits[0];
						}
					}
				}
			}
		}
	}
	return resAIW + ((resDec == "") ? "正" : resDec);
}
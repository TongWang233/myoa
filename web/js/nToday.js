/*****************************************************************************
                      ��������
*****************************************************************************/

var lunarInfo=new Array(
0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,
0x4ae0,0xa5b6,0xa4d0,0xd250,0xd255,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,
0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,
0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,
0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,
0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,
0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,
0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,
0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,
0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,
0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,
0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,
0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,
0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,
0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,
0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,
0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,
0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,
0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,
0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,
0xd520);

var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var Gan=new Array("��","��","��","��","��","��","��","��","��","��");
var Zhi=new Array("��","��","��","î","��","��","��","δ","��","��","��","��");

var nStr1 = new Array('��','һ','��','��','��','��','��','��','��','��','ʮ');
var nStr2 = new Array('��','ʮ','إ','ئ','��');
var nStr3 = new Array('һ','��','��','��','��','��','��','��','��','ʮ','ʮһ','ʮ��');

/*****************************************************************************
                        ���ڼ���
*****************************************************************************/

//====================================== ����ũ�� y���������
function lYearDays(y) {
var i, sum = 348;
for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
return(sum+leapDays(y));
}

//====================================== ����ũ�� y�����µ�����
function leapDays(y) {
if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
else return(0);
}

//====================================== ����ũ�� y�����ĸ��� 1-12 , û�򷵻� 0
function leapMonth(y) {
var lm = lunarInfo[y-1900] & 0xf;
return(lm==0xf?0:lm);
}

//====================================== ����ũ�� y��m�µ�������
function monthDays(y,m) {
return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}


//====================================== ���ũ��, �������ڿؼ�, ����ũ�����ڿؼ�
//                           �ÿؼ������� .year .month .day .isLeap
function Lunar(objDate) {

  var i, leap=0, temp=0;
  var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;

  for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }

  if(offset<0) { offset+=temp; i--; }

  this.year = i;
  leap = leapMonth(i); //���ĸ���
  this.isLeap = false;

  for(i=1; i<13 && offset>0; i++) {
    //����
    if(leap>0 && i==(leap+1) && this.isLeap==false)
      { --i; this.isLeap = true; temp = leapDays(this.year); }
    else
      { temp = monthDays(this.year, i); }

    //�������
    if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

    offset -= temp;
  }

  if(offset==0 && leap>0 && i==leap+1)
    if(this.isLeap)
      { this.isLeap = false; }
    else
      { this.isLeap = true; --i; }

  if(offset<0){ offset += temp; --i; }

  this.month = i;
  this.day = offset + 1;
 

  var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3;
  var cY, cM, cD; //����,����,����
  var lDPOS = new Array(3);
  var n = 0;
  var firstLM = 0;




  ////////���� 1900��������Ϊ������(60����36)
  if(objDate.getMonth()<2) cY=cyclical(objDate.getFullYear()-1900+36-1);
  else cY=cyclical(objDate.getFullYear()-1900+36);
 

  ////////���� 1900��1��С����ǰΪ ������(60����12)
  cM = cyclical((objDate.getFullYear()-1900)*12+objDate.getMonth()+12);
  
  this.nY=cY;//(ũ������)
  this.nM=cM;//(ũ������)
  this.nToday=cY+"�� "+nStr3[this.month-1]+"��"+cDay(this.day)+"��";
  //alert(cY+"��"+this.month+"��"+cDay(this.day)+"��")
}

//==============================���ع��� y��ĳm+1�µ�����
function solarDays(y,m) {
  if(m==1)
    return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
  else
    return(solarMonth[m]);
}
//============================== ���� offset ���ظ�֧, 0=����
function cyclical(num) {
  return(Gan[num%10]+Zhi[num%12]);
}


//====================== ��������
function cDay(d){
  var s;

  switch (d) {
    case 10:
      s = '��ʮ'; break;
    case 20:
      s = '��ʮ'; break;
      break;
    case 30:
      s = '��ʮ'; break;
      break;
    default :
      s = nStr2[Math.floor(d/10)];
      s += nStr1[d%10];
  }
  return(s);
}



///////////////////////////////////////////////////////////////////////////////


var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();
//////////////////////////////////////////////////////////////////////////////

function initialize() {
  tmp = new Lunar(new Date(tY,tM,tD));
	
}
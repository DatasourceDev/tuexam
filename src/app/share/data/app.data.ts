import { Injectable, Inject } from '@angular/core';

@Injectable()

export class AppData {
          
  constructor() {


  }
  getstatus() {
    var list = [];
    list.push({ value: '1', text: 'ใช้งาน' });
    list.push({ value: '0', text: 'ยกเลิก' });
    return list;
  }
  getprefix() {
    var list = [];
    list.push({ value: '0', text: 'นาย' });
    list.push({ value: '1', text: 'นางสาว' });
    list.push({ value: '2', text: 'นาง' });
    return list;
  }
  getrole() {
    var list = [];
    list.push({ value: '0', text: 'เจ้าหน้าที่ทั่วไป (Administrator)' });
    list.push({ value: '1', text: 'เจ้าหน้าที่พิเศษ (Master Administrator)' });
    list.push({ value: '2', text: 'ผู้กลั่นกรองข้อสอบ (Question Approval)' });
    list.push({ value: '3', text: 'ผู้กลั่นกรองข้อสอบพิเศษ (Master Question Approval)' });
    list.push({ value: '4', text: 'ผู้คัดเลือกแบบทดสอบ (Test Approval)' });
    list.push({ value: '5', text: 'ผู้คัดเลือกแบบทดสอบพิเศษ (Master Approval)' });
    return list;
  }

  getcourse() {
    var list = [];
    list.push({ value: '0', text: 'ไทย' });
    list.push({ value: '1', text: 'อังกฤษ' });
    return list;
  }
  getapprovestatus() {
    var list = [];
    list.push({ value: '0', text: 'ร่าง' });
    list.push({ value: '1', text: 'รอการกลั่นกรอง' });
    list.push({ value: '2', text: 'กลั่นกรองแล้ว' });
    list.push({ value: '3', text: 'ไม่ผ่านการกลั่นกรอง' });
    return list;
  }
  getlevel() {
    var list = [];
    list.push({ value: '0', text: 'ง่ายมาก' });
    list.push({ value: '1', text: 'ง่าย' });
    list.push({ value: '2', text: 'ปานกลาง' });
    list.push({ value: '3', text: 'ยาก' });
    list.push({ value: '4', text: 'ยากมาก' });
    return list;
  }

  gettimetype() {
    var list = [];
    list.push({ value: '0', text: 'วินาที' });
    list.push({ value: '1', text: 'นาที' });
    list.push({ value: '2', text: 'ชั่วโมง' });
    return list;
  }

  gettestdoexamtype() {
    var list = [];
    list.push({ value: '0', text: 'เดินหน้าและถอยหลัง' });
    list.push({ value: '1', text: 'เดินหน้าอย่างเดียว' });
    return list;
  }

  getshowresult() {
    var list = [];
    list.push({ value: '0', text: 'แสดง' });
    list.push({ value: '1', text: 'ไม่แสดง' });
    return list;
  }

  gettestquestiontype() {
    var list = [];
    list.push({ value: '0', text: 'สุ่ม' });
    list.push({ value: '1', text: 'กำหนดเอง' });
    return list;
  }
  gettestcustomordertype() {
    var list = [];
    list.push({ value: '0', text: 'เรียงลำดับ' });
    list.push({ value: '1', text: 'สลับข้อ' });
    return list;
  }

  getquestiontype() {
    var list = [];
    list.push({ value: '1', text: 'ข้อสอบแบบเลือกตอบ (Multiple Choice)' });
    list.push({ value: '2', text: 'ข้อสอบแบบถูก-ผิด (True-False)' });
    list.push({ value: '3', text: 'ข้อสอบแบบจับคู่ (Multiple Matching)' });
    list.push({ value: '4', text: 'ข้อสอบแบบตอบสั้น (Short Answer)' });
    list.push({ value: '5', text: 'ข้อสอบอัตนัยหรือเรียงความ (Essay)' });
    list.push({ value: '6', text: 'ข้อสอบแบบส่งงาน (Assignment)' });
    list.push({ value: '7', text: 'ข้อสอบแบบเลือกตอบประกอบบทความ (Reading Text And Multiple Choice)' });
    list.push({ value: '8', text: 'ข้อสอบแบบวัดทัศนคติ (Attitude)' });
    return list;
  }

  getexamperiod() {
    var list = [];
    list.push({ value: '0', text: 'เช้า' });
    list.push({ value: '1', text: 'บ่าย' });
    list.push({ value: '2', text: 'ค่ำ' });
    return list;
  }

  getgradestatus() {
    var list = [];
    list.push({ value: '0', text: 'รอตรวจสอบ' });
    list.push({ value: '1', text: 'ตรวจแล้ว' });
    return list;
  }
}




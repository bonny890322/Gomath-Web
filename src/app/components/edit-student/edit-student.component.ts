import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  StudentData: any;
  studentId: string = '';
  name: string = '';
  class: string = '';
  schoolName: string = '';
  gender: boolean = true;
  accountId: string = '';
  constructor(private HttpsService: HttpsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStudents()
  }
  getStudents(): void {
    this.HttpsService.getStudents().subscribe(StudentData => {
      console.log(StudentData)
      StudentData.forEach((element: any) => {
        if (element.accountId == this.route.snapshot.paramMap.get('accountId')!) {
          this.name = element.name
          this.class = element.class
          this.studentId = element.studentId
          this.schoolName = element.schoolName
          this.gender = element.gender
          this.accountId = element.accountId

        }
      });
    })
  }
  updateStudents(): void {
    var updateData = {
      "accountId": this.accountId,
      "studentId": this.studentId,
      "name": this.name,
      "class": this.class,
      "gender": this.gender
    }
    console.log(updateData)
    this.HttpsService.updateStudent(this.accountId, updateData).subscribe(res => {
      console.log(res)
      if (res.status == 200 && res.body == true) {
        Swal.fire({
          title: '成功',
          icon: 'success',
          text: '修改成功！',
          confirmButtonText: '好的'
        })
      } else {
        Swal.fire({
          title: '錯誤',
          icon: 'error',
          text: '修改失敗！',
          confirmButtonText: '好的'
        })
      }
    })
  }
}
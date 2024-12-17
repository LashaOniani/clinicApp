import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-helper-btns',
  templateUrl: './calendar-helper-btns.component.html',
  styleUrl: './calendar-helper-btns.component.css'
})
export class CalendarHelperBtnsComponent {
  @Input() delBtnState !: boolean;
  @Input() editBtnState !: boolean;
  //თუ დალოგინებული არ არის იუზერი და ცდილობს რედაქტირების ან წაშლის გაკეთებას UI ში დიზაინი არ შეიცვლება
  @Input() btnStates !: boolean; 

  @Output() handleHelperBtns = new EventEmitter<any>();

  displayEdit(){
    // console.log(this.btnStates)
    if(this.btnStates){
      this.editBtnState = !this.editBtnState
      this.delBtnState = this.editBtnState ? false : this.delBtnState
      this.handleRequest();
    }
  }
  displayDelete(){
    // console.log(this.btnStates)
    if(this.btnStates){
      this.delBtnState = !this.delBtnState
      this.editBtnState = this.delBtnState ? false : this.editBtnState
      // მოცემული ფუნქცია გადასცემს მშობელს პარამეტრს და თრუს შემთხვევაში უაქტიურებს ფუნქციას
      this.handleRequest();
    }
  }
  
  handleRequest(){
    console.log({delBtnState: this.delBtnState, editBtnState: this.editBtnState})
    this.handleHelperBtns.emit({delBtnState: this.delBtnState, editBtnState: this.editBtnState})
  }

  
}

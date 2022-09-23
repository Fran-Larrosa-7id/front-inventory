import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categyService:CategoryService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns:string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(){
    this.categyService.getCategories().subscribe(res =>{
      console.log(res)
      this.processCategoriesResponse(res);
    })
  }

  processCategoriesResponse(res:any){

    const dataCategory: CategoryElement[] = [];

    if(res.metadata[0].code == "00"){

      let listCategory = res.categoryResponse.category;

      listCategory.forEach((element:CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }

  }

  addCategory(){

      const dialogRef = this.dialog.open(NewCategoryComponent , {
        width: '450px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
          if(result == 1){
            this.openSnackBar("Categoria agregada","Exitosa");
            this.getCategories();
          }else if(result == 2){
            this.openSnackBar("Categoria no se agrego","Error");
          }
      });
  }

  openSnackBar(msg:string,action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(msg,action,{
      duration:2000
    })
  }

  edit(id:number, name:string, description:string){

    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '450px',
      data:{id,name,description},
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result == 1){
          this.openSnackBar("Categoria actualizada","Exitosa");
          this.getCategories();
        }else if(result == 2){
          this.openSnackBar("Categoria no se actualizo","Error");
        }
    });
}

deleteCategory(id:any){

  
  const dialogRef = this.dialog.open(ConfirmComponent , {
    width: '450px',
    data:{id},
  });

  dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        this.openSnackBar("Categoria eliminada","Exitosa");
        this.getCategories();
      }else if(result == 2){
        this.openSnackBar("Categoria no se elimino","Error");
      }
  });

}

buscar(termino:any){
  if(termino.lenght === 0){

    return this.getCategories()

  }

  this.categyService.getCategoryById(termino)
  .subscribe(
    {
      next: res => {
        this.processCategoriesResponse(res)
      }
    }
  )
}


}


export interface CategoryElement {
  description:string;
  id:number;
  name:string;
}

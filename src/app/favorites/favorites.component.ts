import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import {Navigation} from '@angular/router';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  existingUser: any;
  favArrays= [];
  slides = [];
  places:[] = [];
  selectedPlace?;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getFavoritePlace();

    
  }


  // getting favorite places
  getFavoritePlace(){
    let uid =(sessionStorage.getItem('ID:'));

    this.userService.getUser(uid)
    .subscribe(data => {
    console.log("User data: ", data);
  this.existingUser  = data;
  this.favArrays = (this.existingUser.preference.favoritePlaces[0]);
  console.log("favorite places", this.favArrays)

  
  

  });


  }

  removeFavoritePlace(no : number){
    
    let ID = sessionStorage.getItem('ID:');
    let RemfavObject = {
    id : ID, 
    place : no,
    
    }
    this.favArrays.splice(no,1);  
    console.log("favorite places", this.favArrays )

  this.userService.removeFavoritePlace(RemfavObject).subscribe(data => {
    console.log("user data: ", data);

    alert(`Place removed from favorites!`);

   
    
  });
  

  }

  
}
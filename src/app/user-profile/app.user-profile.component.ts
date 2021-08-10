import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ILocaleCurrencyList, ILocaleRegionList, IUserProfileData } from '../interfaces/user-profile-interfaces';
import { AppUserProfileService } from './app.user-profile.service';

@Component({
  selector: 'user-profile',
  templateUrl: './app.user-profile.component.html',
  styleUrls: ['./app.user-profile.component.scss'],
})

export class AppUserProfileComponent implements OnInit {
  _pageLoad: boolean;
  _formSubmit: boolean = false;
  userProfileForm: FormGroup;
  regionsList: Array<ILocaleRegionList> = [] as Array<ILocaleRegionList>;
  currencyList: Array<ILocaleCurrencyList> = [] as Array<ILocaleCurrencyList>;

  constructor(private profSvc: AppUserProfileService, private toast: HotToastService) {
    this._pageLoad = true;
    this.userProfileForm = new FormGroup({
      email: new FormControl({ value: "", disabled: true }),
      avatar: new FormControl(""),
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl(""),
      region: new FormControl("", [Validators.required]),
      currency: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.profSvc.getProfileData().subscribe((response: IUserProfileData) => {
      this.userProfileForm.controls["email"].setValue(response.email);
      this.userProfileForm.controls["avatar"].setValue(response.avatar);
      this.userProfileForm.controls["firstname"].setValue(response.firstname);
      this.userProfileForm.controls["lastname"].setValue(response.lastname);
      this.userProfileForm.controls["region"].setValue(response.region);
      this.userProfileForm.controls["currency"].setValue(response.currency);

      this.regionsList = response.regionlist;
      this.currencyList = response.currencylist;

      this._pageLoad = false;
    }, error => {
      this._pageLoad = false;
    });
  }

  changeRegion(e: any) {
    this.userProfileForm.controls["region"].setValue(e.target.value, { onlySelf: true });
  }

  changeCurrency(e: any) {
    this.userProfileForm.controls["currency"].setValue(e.target.value, { onlySelf: true });
  }

  updateUserProfile(formData: FormGroup) {
    console.log(formData);
    this._formSubmit = true;
    setTimeout(() => { this._formSubmit = false; }, 2000);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ILocaleCurrencyList, ILocaleRegionList, IUserProfileData, IUserProfileUpdateData } from './app.user-profile-interfaces';
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
    this._formSubmit = true;
    if (formData.status === "VALID") {
      let postData: IUserProfileUpdateData = this.mapData(formData);
      this.profSvc.updateProfileData(postData).pipe(this.toast.observe({
        loading: "Updating your profile, please wait...",
        success: "Your profile details have been updated",
        error: "Failed to update profile details"
      })).subscribe((response: boolean) => {
        if (response) {
          this._formSubmit = false;
        }
        else {
          this._formSubmit = false;
          this.toast.error("Failed to update profile details");
        }
      }, error => {
        this._formSubmit = false;
      });
    } else {
      this.toast.error("Data entered in the form is invalid");
      this._formSubmit = true;
    }
  }

  mapData(formData: FormGroup): IUserProfileUpdateData {
    let data: IUserProfileUpdateData = {} as IUserProfileUpdateData;

    data.avatar = formData.controls["avatar"].value == null ? "" : formData.controls["avatar"].value;
    data.firstname = formData.controls["firstname"].value;
    data.lastname = formData.controls["lastname"].value;
    data.region = formData.controls["region"].value;
    data.currency = formData.controls["currency"].value;

    return data;
  }
}

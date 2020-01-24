import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../mime-type.validator';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviewForm: FormGroup;
  starValue: number;
  starArray = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
  imagePreview;
  imageObj;
  isImageUploaded = false;
  reviewSuccess = false;
  reviewFailure: boolean;

  constructor(private dataService: DataService, private authService: AuthService,
    public dialogRef: MatDialogRef<ReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      starValue: new FormControl(null),
      image: new FormControl(null, { validators: Validators.required, asyncValidators: [mimeType] }),
      reviewDesc: new FormControl()
    });
  }

  previewRating(index) {
    if (!this.reviewForm.get('starValue').value) {
      this.starArray.forEach((star, i) => {
        if (i <= index) {
          this.starArray[i] = 'star';
        }
      });
    }
  }

  removePreview() {
    if (this.reviewForm.get('starValue').value !== null) {
      this.starArray.forEach((star, i) => {
        this.starArray[i] = 'star_border';
      });
    }
  }

  selectRating(index) {
    this.starArray.forEach((star, i) => {
      if (i <= index) {
        this.starArray[i] = 'star';
      } else {
        this.starArray[i] = 'star_border';
      }
    });

    this.reviewForm.patchValue({
      starValue: parseInt(index, 10) + 1
    });
  }

  onImageUpload(event: Event) {
    const fileObj: any = {};
    fileObj.file = (event.target as HTMLInputElement).files[0];
    this.reviewForm.patchValue({
      image: fileObj.file
    });
    this.reviewForm.get('image').updateValueAndValidity();

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result !== '' && fileReader.result) {
        fileObj.url = fileReader.result;
        this.imagePreview = fileObj.url;
        this.isImageUploaded = true;
      }
    };
    fileReader.readAsDataURL(fileObj.file);
    this.imageObj = fileObj.file;
  }

  submitReview() {
    const reviewData = new FormData();
    reviewData.append('starValue', this.reviewForm.get('starValue').value);
    reviewData.append('photo', this.imageObj || null);
    reviewData.append('desc', this.reviewForm.get('reviewDesc').value || '');

    // if(this.dataService.selectedProvider !== '0') {
    //   reviewData.append('serviceProvider', this.dataService.getServiceProviderData()[parseInt(this.dataService.selectedProvider, 10)].email);
    // } else {
    //   reviewData.append('serviceProvider', this.dataService.getServiceProviderData().email);
    // }
    reviewData.append('serviceProvider', this.dataService.getServiceProviderData().email);

    reviewData.append('customer', this.authService.getUserData().email);
    reviewData.append('firstName', this.authService.getUserData().firstName);
    reviewData.append('lastName', this.authService.getUserData().lastName);

    this.dataService.saveReview(reviewData).subscribe(
      (response) => {
        if (response.success) {
          this.reviewSuccess = true;
          this.data.reviewSuccess = true;
        }
      },
      (error) => {
        this.reviewFailure = true;
      }
    );
  }
}

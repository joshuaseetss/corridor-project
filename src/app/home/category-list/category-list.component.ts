import { Component, OnInit } from '@angular/core';

import { Category } from './category.model';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [
      new Category("Hair", "https://s3-alpha-sig.figma.com/img/4d22/7da6/433602da4c4d70ddb06d41549cdc76c8?Expires=1569196800&Signature=NQqCCDMMhZotZRt-k2WAWMVr3ESNH3Rcw9Ky-hYMD7rjM~IHWa~BELSN-Dtzl4Mu8opOz8OT2ia6u2CqVcIpU2LL9uYUYehhPKlUM9xmTXug6RuhkW5E3szftFWf2ECxzsrdF9LuJ97eeu7zDIY83ENj9Ht7El-cyDIFlgqimgbSs~zWIMJpx54aI-Owxvzy1e8yT1hfcjzb~WUm6cTLV0SjIFHFNFIg~w1patuuITOBC9ncA-NhbM6l3I976Y5TDJS6UFrYkIkm~ZoMRdT8FryVKvHdzVms4Q6KijqGEhLej~eOvwmwKQyD1wyle0MoCkU87NCm2gySM8J0DHemhw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"),
      new Category("Facial", "https://s3-alpha-sig.figma.com/img/1ca2/ace2/dc0bd91fabfd0ad3c3d94c4f0b9d2e3f?Expires=1569196800&Signature=CfD21rlkx1IdpvJWeZt1T1dioPF9Gg~eZ8l8vZoNLMsb125orJLk508mgyiRIKqjsNhlGy7CRsQO1pBLSAr68gmfrlwagLbyFV~gWRgt7DVEAB1F8yCY3-pc90kajVfmMpfhUCgkJtG2TEAURpV5UIJZU77wjW96wp2K4KH-jFyVTmeBCtDPdbCPNBXwH1OJUixGJi6ur~AmDDpPq95I2ohE0ZBnKkCecMsV4xgnxWNdan7XB-7G0jONyUqhbvjRERorCxZQ-gbtI0V0tb9JTJYv~RAOhT5dasZpcjlGILrQZgZbkSPbDnqrRu8Mxb2O4sn5p5XuODbBHpH38KJVVQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"),
      new Category("Brows and Lashes", "https://premiermassage.net/images/services/brows_lashes_380x280.jpg"),
      new Category("Makeup", "https://s3-alpha-sig.figma.com/img/e6d3/cbb2/5be7581f91eae30cc4af3bed1a53679d?Expires=1569196800&Signature=P58ys7sRuRFaO1~VIuticliNPH4S9FqzwB8UFfSk7hBHOz5OvIbdCCJD8mVGu3wygMyLzyRGoyB7wEO35LSELuSYmz7v7PGSAPftz3XbY9RKLqbmoMKluaGhiAg3fd0bP2srlliY3pqy7PEbKF0D8FgGAbGHOimF8ffrLnP5XEySFBIk4e25sS1~aQWenzZ9GwSxL6RK~YZDCgk-Gz34GhyqVwHiWchiNRmO0UGUG-6UcEblEfdC~OpPxuo70r3UJ9yqOA5OTNGL93hlU0O2ynMmVLov9gRnNZDCfhaEu~tqDh4ag5xKjMHRIWfbXQsGjHOz9OCUoqgO-fRjb7-bDg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"),
      new Category("Nails", "https://s3-alpha-sig.figma.com/img/869b/5e49/8f9358185d95adf13b229ce05f615904?Expires=1569196800&Signature=V1~nYCyNMFMaB-JRT-0uqCzgGxpjbWSZKZ3LdHd7cZsU~4h~3zqWIr-sk22TaBPzxwu72tVFu9sWIakzcqce9pg4lUhLNmaCdLqbmLmbzu~kx7ud1S4ZF2o6EAFnKiThqL7MnVu64tgyaek9hc3RLV8XTWOweYf5KCKJvmHE4nDAup5QQz1IkKmX15X4bpXKNXLigwvKaa541ilX8WAe6KbBKRVfzgd3p-mgvSmxExwo3IqSsR9UVpq40wz7e12ENQcR1fcNpsp33cRYRdhIA~z39SmCIG4OXb2C7g5vvAh~5ueUp~72b7uMgwisiLTidH3XRu31j4MaMp8yEQUf8w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"),

  ];

  constructor() { }

  ngOnInit() {
  }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WhitelistRetailer} from "../../../../types/whitelist-retailer";
import {WhitelistRetailerDomain} from "../../../../types/whitelist-retailer-domain";
import {AdminService} from "../../../../services/admin.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-domain-create',
  templateUrl: './whitelist-retailer-domain-create.component.html',
  styleUrls: ['./whitelist-retailer-domain-create.component.scss']
})
export class WhitelistRetailerDomainCreateComponent implements OnInit {
  public domainCreateForm: FormGroup = new FormGroup({
    domain: new FormControl('', [
      Validators.required,
    ]),
  });

  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }

  /**
   * Constructor
   * @constructor
   * @param {AdminService} adminService service providing admin functionalities
   * @param {NgbModal} modalService service providing modal functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public adminService: AdminService, public activeModal: NgbActiveModal, private modalService: NgbModal) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.getWhitelistRetailerData();
  }

  /**
   * Gets whitelist retailer data
   */
  public async getWhitelistRetailerData(): Promise<void> {
    if (this.whitelistRetailer.id !== null) {
      this.adminService.getWhitelistRetailerData(this.whitelistRetailer.id).subscribe({
        next: res => {
          this.whitelistRetailer = res;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
  }

  public async addDomainToWhitelistRetailer(): Promise<void> {
    if (this.domainCreateForm.valid) {
      if (this.whitelistRetailer.id === null) {
        this.activeModal.close(this.domainCreateForm.value.domain);
        return;
      }

      this.adminService.addDomainToWhitelistRetailer(this.whitelistRetailer.id, this.domainCreateForm.value.domain).subscribe({
        next: (domain: WhitelistRetailerDomain) => {
          if (domain.id !== null) {
            this.activeModal.close(`created ${domain.id}`);
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }
  }
}

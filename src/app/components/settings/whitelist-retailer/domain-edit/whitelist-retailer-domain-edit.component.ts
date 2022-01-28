import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WhitelistRetailer} from "../../../../types/whitelist-retailer";
import {WhitelistRetailerDomain} from "../../../../types/whitelist-retailer-domain";
import {AdminService} from "../../../../services/admin.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-domain-edit',
  templateUrl: './whitelist-retailer-domain-edit.component.html',
  styleUrls: ['./whitelist-retailer-domain-edit.component.scss']
})
/**
 * Component for editing of a whitelist retailer domain
 */
export class WhitelistRetailerDomainEditComponent implements OnInit {
  public domainEditForm: FormGroup = new FormGroup({
    domain: new FormControl(''),
  });

  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }

  public whitelistRetailerDomain: WhitelistRetailerDomain = {
    id: null,
    domain: '',
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
    this.adminService.getWhitelistRetailerData(this.whitelistRetailer.id).subscribe({
      next: res => {
        this.whitelistRetailer = res;
        this.domainEditForm.controls['domain'].setValue(res.domains.filter((whitelistRetailerDomain: WhitelistRetailerDomain) => whitelistRetailerDomain.id == this.whitelistRetailerDomain.id)[0].domain);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**
   * Edits domain of whitelist retailer
   */
  public async editDomainOfWhitelistRetailer(): Promise<void> {
    this.adminService.editDomainOfWhitelistRetailer(this.whitelistRetailer.id, this.whitelistRetailerDomain.id, {
        domain: this.domainEditForm.controls['domain'].value
      }
    ).subscribe({
      next: () => {
        this.activeModal.close('edited');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}

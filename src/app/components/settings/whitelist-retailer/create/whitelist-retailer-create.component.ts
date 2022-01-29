import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {AdminService} from "../../../../services/admin.service";
import {WhitelistRetailer} from "../../../../types/whitelist-retailer";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WhitelistRetailerDomainDeleteComponent} from "../domain-delete/whitelist-retailer-domain-delete.component";
import {WhitelistRetailerDomainCreateComponent} from "../domain-create/whitelist-retailer-domain-create.component";

@Component({
  selector: 'app-whitelist-retailer-create',
  templateUrl: './whitelist-retailer-create.component.html',
  styleUrls: ['./whitelist-retailer-create.component.scss']
})

/**
 * Component whitelist retailer creation popup
 *
 *
 */
export class WhitelistRetailerCreateComponent {
  public whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  }
  public retailerCreateForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  public domains: string[] = [];
  public dirty: boolean = false;

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
  }


  /**
   * Edits domain of whitelist retailer
   */
  public async createWhitelistRetailer(): Promise<void> {
    console.log(this.domains);
    this.adminService.createWhitelistRetailer(this.domains, this.retailerCreateForm.value.name).subscribe({
      next: () => {
        this.activeModal.close('created');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  openWhitelistRetailerDomainCreationForm() {
    const modal = this.modalService.open(WhitelistRetailerDomainCreateComponent);

    modal.result.then((result) => {
      if (result !== 'aborted') {
        this.domains.push(result);
        this.dirty= true;
      }
    });
  }

  openWhitelistRetailerDomainEditForm(whitelistRetailerDomainId : string) {
    const modal = this.modalService.open(WhitelistRetailerDomainDeleteComponent);
    modal.componentInstance.whitelistRetailerDomain.id = whitelistRetailerDomainId;

    modal.result.then((result) => {
      if (result !== 'aborted') {
        //this.getWhitelistRetailerData();
        this.dirty= true;
      }
    });
  }

  openWhitelistRetailerDomainDeletionDialog(whitelistRetailerDomain : string) {
    const modal = this.modalService.open(WhitelistRetailerDomainDeleteComponent);
    modal.componentInstance.domain = whitelistRetailerDomain;

    modal.result.then((result) => {
      if (result !== 'aborted') {
        const index = this.domains.indexOf(whitelistRetailerDomain, 0);
        if (index > -1) {
          this.domains.splice(index, 1);
        }        this.dirty= true;
      }
    });
  }
}

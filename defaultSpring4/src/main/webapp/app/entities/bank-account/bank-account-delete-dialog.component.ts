import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { BankAccount } from './bank-account.model';
import { BankAccountPopupService } from './bank-account-popup.service';
import { BankAccountService } from './bank-account.service';

@Component({
    selector: 'jhi-bank-account-delete-dialog',
    templateUrl: './bank-account-delete-dialog.component.html'
})
export class BankAccountDeleteDialogComponent {

    bankAccount: BankAccount;

    constructor(
        private bankAccountService: BankAccountService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.bankAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankAccountListModification',
                content: 'Deleted an bankAccount'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success(`A Bank Account is deleted with identifier ${id}`, null, null);
    }
}

@Component({
    selector: 'jhi-bank-account-delete-popup',
    template: ''
})
export class BankAccountDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankAccountPopupService: BankAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.bankAccountPopupService
                .open(BankAccountDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

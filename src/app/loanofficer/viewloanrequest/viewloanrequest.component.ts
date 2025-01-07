import { Component } from '@angular/core';
import { LoanRequestService } from 'src/app/services/loan-request/loan-request.service';

@Component({
  selector: 'app-viewloanrequest',
  templateUrl: './viewloanrequest.component.html',
  styleUrls: ['./viewloanrequest.component.css']
})
export class ViewloanrequestComponent {
  loans: any[] = [];
  rejectionRemarks: { [key: number]: string } = {};
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private loanService: LoanRequestService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getalLoanRequests(this.currentPage - 1, this.pageSize).subscribe(
      (response) => {
        this.loans = response.contents;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      (error) => {
        console.error('Error fetching loans:', error);
      }
    );
  }

  fetchRemarks(loanId: number): void {
    this.loanService.getRejectionRemark(loanId).subscribe(
      (response) => {
        this.rejectionRemarks[loanId] = response.message;
      },
      (error) => {
        console.error('Error fetching rejection remark:', error);
      }
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLoans();
    }
  }

  get paginationArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }
}
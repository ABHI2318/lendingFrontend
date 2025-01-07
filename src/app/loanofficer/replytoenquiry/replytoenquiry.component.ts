import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // This should still be injected here
import { EnquiryServiceService } from 'src/app/services/Enquiry/enquiry-service.service';

@Component({
  selector: 'app-replytoenquiry',
  templateUrl: './replytoenquiry.component.html',
  styleUrls: ['./replytoenquiry.component.css']
})
export class ReplytoenquiryComponent {
  enquiries: any[] = [];
  replyForm: FormGroup;
  selectedEnquiry: any;
  pageNumber: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];
  isReplyModalOpen: boolean = false; // Flag to manage modal visibility

  constructor(
    private fb: FormBuilder,
    private enquiryService: EnquiryServiceService
  ) {
    this.replyForm = this.fb.group({
      response: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchEnquiries(this.pageNumber, this.pageSize);
  }

  fetchEnquiries(pageNumber: number, pageSize: number): void {
    this.enquiryService.getAllEnquiries(pageNumber, pageSize).subscribe({
      next: (response: any) => {
        this.enquiries = response.contents;
        console.log(this.enquiries);
        
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (err: any) => console.error('Error fetching enquiries:', err)
    });
  }

  openReplyModal(enquiry: any): void {
    this.selectedEnquiry = enquiry.enquiryId;
    this.replyForm.reset();
    this.isReplyModalOpen = true; // Open the modal
  }

  closeReplyModal(): void {
    this.isReplyModalOpen = false; // Close the modal
  }

  onReplyEnquiry(): void {
    if (this.replyForm.valid && this.selectedEnquiry !== null) {
      const response = this.replyForm.value.response;
      this.enquiryService.replyToEnquiry(this.selectedEnquiry, this.replyForm.value).subscribe({
        next: () => {
          this.isReplyModalOpen = false; // Close modal after replying
          this.fetchEnquiries(this.pageNumber, this.pageSize);
        },
        error: (err: any) => console.error('Error replying to enquiry:', err)
      });
    }
  }

  onPageChange(newPage: number): void {
    this.pageNumber = newPage;
    this.fetchEnquiries(this.pageNumber, this.pageSize);
  }
}
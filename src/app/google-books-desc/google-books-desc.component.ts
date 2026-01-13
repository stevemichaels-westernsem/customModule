import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface ItemData {
	isbn?: string[];
	lccn?: string[];
	oclcid?: string[];
	aulast?: string | string[];
	aufirst?: string | string[];
}

interface Display {
	title?: string | string[];
	description?: string | string[];
}

interface PNX {
	addata?: ItemData;
	display?: Display;
}

interface SearchResult {
	pnx?: PNX;
}

interface HostComponent {
	searchResult?: SearchResult;
}

interface VolumeInfo {
	description?: string;
	infoLink?: string;
}

interface GoogleBooksResponse {
	items?: Array<{
		volumeInfo?: VolumeInfo;
	}>;
}

@Component({
	selector: 'custom-google-books-desc',
	standalone: true,
	imports: [TranslateModule,CommonModule],
	templateUrl: './google-books-desc.component.html',
	styleUrl: './google-books-desc.component.scss'
})

export class GoogleBooksDescComponent implements OnInit {
	@Input() parentCtrl?: any;
	@Input() hostComponent?: HostComponent;

	googleTitle: string = '';
	googleAuSurname: string | null = null;
	googleAuName: string | null = null;
	googleDesc: string | null = null;
	googleInfoLink: string | null = null;
	showGoogleBooks: boolean = false;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		const pnx = this.hostComponent?.searchResult?.pnx;
		const itemData = pnx?.addata || {};
		const display = pnx?.display || {};

		// Check if description exists in pnx.display
		const hasDescription = display.description && 
			(Array.isArray(display.description) ? display.description.length > 0 : true);

		// Only fetch Google Books data if no description exists
		if (!hasDescription) {
			this.showGoogleBooks = true;
			
			const googleIds = this.buildGoogleIdQuery(itemData);

			// Safely normalize to string
			const titleValue = Array.isArray(display.title)
				? display.title[0]
				: display.title || '';

			this.googleTitle = titleValue.toString().replace(/ /g, '+');
			this.googleAuSurname = this.toCleanString(itemData.aulast);
			this.googleAuName = this.toCleanString(itemData.aufirst);

			if (googleIds) {
				this.fetchGoogleBookData(googleIds);
			}
		}
	}

	private buildGoogleIdQuery(data: ItemData): string | null {
		if (data.isbn) {
			return 'isbn:' + this.cleanId(data.isbn[0]).replace(/,/g, '+OR+isbn:');
		}
		if (data.lccn) {
			return 'lccn:' + this.cleanId(data.lccn[0]).replace(/,/g, '+OR+lccn:');
		}
		if (data.oclcid && data.oclcid.find(o => o.includes('ocolc'))) {
			return 'oclc:' + this.cleanId(data.oclcid[0]).replace(/,/g, '+OR+oclc:');
		}
		return null;
	}

	private cleanId(id: string): string {
		return id?.toString()
			.replace(/[-()"]/g, '')
			.replace(/ocolc/g, '') || '';
	}

	private toCleanString(value: string | string[] | undefined): string | null {
		const val = Array.isArray(value) ? value[0] : value;
		return val ? val.toString().replace(/[" ,]/g, '+') : null;
	}

	private async fetchGoogleBookData(query: string): Promise<void> {
		const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

		try {
			const response = await fetch(url);
			const data: GoogleBooksResponse = await response.json();
			
			const volumeInfo = data.items?.[0]?.volumeInfo;
			this.googleDesc = volumeInfo?.description || null;
			this.googleInfoLink = volumeInfo?.infoLink || null;
			
			// Manually trigger change detection
			this.cdr.detectChanges();
		} catch (error) {
			console.error('Error fetching Google Books data:', error);
		}
	}

	get shouldShowContent(): boolean {
		return this.showGoogleBooks && !!this.googleDesc;
	}
}

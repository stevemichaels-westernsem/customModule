import { ExternalSearchComponent } from '../external-search/external-search.component';
import { WtsCustomLibraryResourcesComponent } from '../wts-custom-library-resources/wts-custom-library-resources.component';
import { WtsCustomNoResultsComponent } from '../wts-custom-no-results/wts-custom-no-results.component';
import { WtsHeaderComponent } from '../wts-header/wts-header.component';
import { WtsPayFineLinkComponent } from '../wts-pay-fine-link/wts-pay-fine-link.component';
import { WtsOffensiveMaterialsStatementComponent } from '../wts-offensive-materials-statement/wts-offensive-materials-statement.component';
import { WtsReportRecordComponent } from '../wts-report-record/wts-report-record.component';
import { WtsWithdrawnTitleComponent } from '../wts-withdrawn-title/wts-withdrawn-title.component';
import { WtsZoteroInCitationComponent } from '../wts-zotero-in-citation/wts-zotero-in-citation.component';

// Define the map
export const selectorComponentMap = new Map<string, any>([
	['nde-search-bar-filters-before',ExternalSearchComponent],
	['nde-user-panel-after',WtsCustomLibraryResourcesComponent],
	['nde-search-no-results',WtsCustomNoResultsComponent],
	['nde-header',WtsHeaderComponent],
	['nde-full-display-details-after',WtsOffensiveMaterialsStatementComponent],
	['nde-account-section-results-bottom',WtsPayFineLinkComponent],
	['nde-record-availability-bottom',WtsReportRecordComponent],
	['nde-record-availability-top',WtsWithdrawnTitleComponent],
	['nde-citation-action-after',WtsZoteroInCitationComponent],
]);

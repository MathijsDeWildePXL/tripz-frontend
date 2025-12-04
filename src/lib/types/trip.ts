export interface TransportType {
	value: string;
	label: string;
}

export interface TripFormData {
	departureDate: string;
	returnDate: string;
	destination: string;
	distance: string;
	transportType: string;
	purpose: string;
	estimatedCost: string;
}

export interface TripSubmitData {
	employeeId: string;
	employeeName: string;
	transportType: number;
	departureDate: string;
	returnDate: string;
	destination: string;
	distance: number;
	purpose: string;
	estimatedCost: number;
}

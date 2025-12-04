export type User = {
	id: number;
	nickname: string;
	companyEmail: string;
	password: string;
	role: string;
};

export type Trip = {
	id: string;
	employeeId: string;
	employeeName: string;
	transportType: string;
	departureDate: string;
	returnDate: string;
	destination: string;
	distance?: number;
	purpose?: string;
	estimatedCost: number;
	status: string;
	submittedAt: string;
};

export type TripFilters = {
	employeeId?: string;
	transportType?: number;
	month?: number;
	year?: number;
};

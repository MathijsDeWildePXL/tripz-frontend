import type { PageLoad } from './$types';
import type { TransportType, TripFormData, TripSubmitData } from '$lib/types/trip';

const API_URL = import.meta.env.VITE_API_URL;

export const transportTypes: TransportType[] = [
	{ value: '1', label: 'Car' },
	{ value: '2', label: 'Train' },
	{ value: '3', label: 'Plane' },
	{ value: '4', label: 'Bus' },
	{ value: '5', label: 'Other' }
];

export function validateForm(formData: TripFormData): Record<string, string> {
	const errors: Record<string, string> = {};

	if (!formData.departureDate) errors.departureDate = 'Departure date is required';
	if (!formData.returnDate) errors.returnDate = 'Return date is required';
	if (formData.departureDate && formData.returnDate) {
		const departure = new Date(formData.departureDate);
		const returnDate = new Date(formData.returnDate);
		if (returnDate <= departure) {
			errors.returnDate = 'Return date must be after departure date';
		}
	}
	if (!formData.destination) errors.destination = 'Destination is required';
	if (!formData.distance) {
		errors.distance = 'Distance is required';
	} else if (isNaN(parseFloat(formData.distance)) || parseFloat(formData.distance) <= 0) {
		errors.distance = 'Distance must be a positive number';
	}
	if (!formData.transportType) errors.transportType = 'Transport type is required';
	if (!formData.purpose) errors.purpose = 'Purpose is required';
	if (!formData.estimatedCost) {
		errors.estimatedCost = 'Cost is required';
	} else if (
		isNaN(parseFloat(formData.estimatedCost)) ||
		parseFloat(formData.estimatedCost) < 0
	) {
		errors.estimatedCost = 'Cost must be a positive number';
	}

	return errors;
}

export async function submitTrip(formData: TripFormData): Promise<{ success: boolean; error?: string; data?: any }> {
	try {
		const tripData: TripSubmitData = {
			employeeId: 'EMP006', // TODO: Get from auth context
			employeeName: 'Diana Prince', // TODO: Get from auth context
			transportType: parseInt(formData.transportType),
			departureDate: new Date(formData.departureDate).toISOString(),
			returnDate: new Date(formData.returnDate).toISOString(),
			destination: formData.destination,
			distance: parseInt(formData.distance),
			purpose: formData.purpose,
			estimatedCost: parseFloat(formData.estimatedCost)
		};

		const response = await fetch(`${API_URL}/Trips`, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(tripData)
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('Trip created:', data);
		return { success: true, data };
	} catch (error) {
		console.error('Error submitting trip:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'An error occurred while submitting the trip'
		};
	}
}

export const load: PageLoad = async () => {
	return {
		transportTypes
	};
};

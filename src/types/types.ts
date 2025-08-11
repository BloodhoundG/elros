import type { SortItem } from 'vuetify/lib/components/VDataTable/composables/sort.mjs';

interface City {
    id: number;
    name: string;
    subject: {
        id: number;
        name: string;
    };
    district: {
        id: number;
        name: string;
    };
    location: [number, number];
}

interface Address {
    id: number;
    location: [number, number];
    city: City;
    created: string;
    modified: string;
    address: string;
    address_type: 'actual' | 'legal';
    fias_id: string;
}

interface ObjectType {
    id: number;
    name: string;
    full_name: string;
    minutes_of_partner_ref_life: number;
    is_seller: boolean;
    is_guider: boolean;
    is_service: boolean;
    is_public: boolean;
}

interface WorkScheduleItem {
    id: number;
    weekday: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    start_time: string;
    end_time: string;
    has_break: boolean;
    break_start_time: string;
    break_end_time: string;
    is_day_off: boolean;
}

interface PaymentDetails {
    id: number;
    created: string;
    modified: string;
    org_type: 'legal' | 'individual';
    inn: string;
    kpp: string;
    ogrn: string;
    passport_series: string;
    passport_number: string;
    passport_issued_by: string;
    passport_department_code: string;
    ogrnip: string;
    bank_name: string;
    bik: string;
    director_full_name: string;
    correspondent_account: string;
    settlement_account: string;
    email: string;
    phone: string;
    is_active: boolean;
    organization: number;
}

interface Gallery {
    id: number;
    images: unknown[];
    created: string;
    modified: string;
    tourism_object: number;
}

interface ParentOrganization {
    id: number;
    created: string;
    modified: string;
    deleted: string | null;
    name: string;
    short_name: string;
    description: string | null;
    maximum_seats: number;
    is_active: boolean;
    is_main: boolean;
    counterparty_type: 'legal' | 'individual';
    work_mode: string;
    remote_id: string | null;
    object_type: string;
    addresses: number[];
}

export interface Organization {
    id: number;
    uuid: string;
    name: string;
    short_name: string;
    description: string | null;
    maximum_seats: number;
    parent: ParentOrganization | null;
    image: string | null;
    is_seller: boolean;
    object_type: ObjectType;
    addresses: Address[];
    is_active: boolean;
    payment_details: PaymentDetails;
    work_schedule: WorkScheduleItem[];
    children: unknown[];
    work_mode: string;
    gallery: Gallery;
    remote_id: string | null;
    is_favorite: boolean | null;
    is_confirmed: boolean;
    contacts: unknown[];
    halls_count: number;
    activities_count: number;
    orders_count: number;
    is_main: boolean;
    counterparty_type: 'legal' | 'individual';
}

export interface IDataTableServerOptions {
    groupBy: unknown[];
    itemsPerPage: number;
    page: number;
    search: string | undefined;
    sortBy: SortItem[];
}

export interface IFormModel {
    fullName: string;
    shortName: string;
    description: string;
    isActive: boolean;
}

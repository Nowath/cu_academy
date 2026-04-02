

export enum PrefixENUM {
    นาย = "นาย",
    นางสาว = "นางสาว",
    เด็กชาย = "เด็กชาย",
    เด็กหญิง = "เด็กหญิง",
}

export enum GradeENUM {
    ม2 = "ม.2",
    ม3 = "ม.3",
    ม4 = "ม.4",
    ม5 = "ม.5",
    ม6 = "ม.6",
}

export interface IMemberFilter {
    id: number;
    prefix: PrefixENUM;
    name: string;
    grade: GradeENUM;
    day1: boolean;
    day2: boolean;
}

export interface IMember {
    id: number;
    created_at: string | Date;
    prefix: PrefixENUM;
    name: string;
    grade: GradeENUM;
    school_name: string;
    day1: boolean;
    day2: boolean;
    image: string;
    tel: string;
    parent_name: string;
    parent_email: string;
    second_email: string;
    food_allergy: string;
    pass: boolean;
}

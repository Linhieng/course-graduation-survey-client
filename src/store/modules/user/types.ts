export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
    /** 这是登录名，全局唯一。 */
    username: string;

    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
    introduction?: string;
    personalWebsite?: string;
    jobName?: string;
    organizationName?: string;
    locationName?: string;
    phone?: string;
    registrationDate?: string;
    accountId?: number; // 对应 user id。所以改为 number string;
    certification?: number;
    role: RoleType;
}

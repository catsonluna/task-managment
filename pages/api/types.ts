export type Success = {
    success: boolean;
    cause?: string;
    data?: any;
}

export type SessionToken = {
    success: Success;
    data?: {
        token: string;
    }
}

export type Task = {
    success: Success;
    task_id: string;
    task_name: string;
    task_description: string;
    task_status: string;
    task_created: string;
    task_expires: string;
}

export type User = {
    user_id: string;
    data?:{
    username: string;
    tasks: Task[];
    success: Success;
    }
}
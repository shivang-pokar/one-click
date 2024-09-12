import { Server } from 'socket.io';
import { requiresAuthSocket } from '../../auth-middleware';

export const connectSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origins: ['http://localhost:4200']
        }
    });

    io.use(requiresAuthSocket);


    io.on('connection', (socket) => {
        global.socket = socket;
        global.io = io;
        console.log('A user connected');

        socket.on('joinCompany', (company_id) => {
            socket.join(company_id);
            console.log(`User joined company room: ${company_id}`);
        });

        socket.on('joinProject', (project_id) => {
            socket.join(project_id);
            console.log(`User joined project room: ${project_id}`);
        });

        socket.on('leaveProject', (projectId) => {
            socket.leave(projectId);
            console.log(`User left project: ${projectId}`);
        });

        socket.on('leaveComments', (task_id) => {
            socket.leave(task_id);
            console.log(`User left Comments: ${task_id}`);
        });

        socket.on('leaveAllProjects', () => {
            // Get all rooms the socket is connected to
            for (let room of socket.rooms) {
                if (room !== socket.id) {
                    socket.leave(room);
                    console.log(`User left project: ${room}`);
                }
            }
        });

        socket.on('joinGroup', (group_id) => {
            socket.join(group_id);
            console.log(`User joined group room: ${group_id}`);
        });

        socket.on('joinComments', (task_id) => {
            socket.join(task_id);
            console.log(`User joined comments: ${task_id}`);
        });

        socket.on('addProject', (projectData) => {
            const { company_id } = projectData;
            io.to(company_id).emit('projectAdded', projectData);
        });

        socket.on('addCompany', (companyData) => {
            const { id } = companyData;
            io.to(id).emit('companyAdded', companyData);
        });

        socket.on('addTodoGroup', (groupData) => {
            const { project_id } = groupData;
            io.to(project_id).emit('todoGroupAdded', groupData);
        });

        socket.on('addTodoTask', (taskData) => {
            const { group_id } = taskData;
            io.to(group_id).emit('todoTaskAdded', taskData);
        });

        socket.on('addTodoComments', (commentsData) => {
            const { task_id } = commentsData;
            io.to(task_id).emit('todoCommentsAdded', commentsData);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
}

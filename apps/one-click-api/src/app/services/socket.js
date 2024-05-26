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

        socket.on('addProject', (projectData) => {
            const { company_id } = projectData;
            io.to(company_id).emit('projectAdded', projectData);
        });

        socket.on('addTodoGroup', (groupData) => {
            const { projectId } = groupData;
            io.to(projectId).emit('todoGroupAdded', groupData);
        });

        socket.on('addTodoTask', (taskData) => {
            const { todoGroupId } = taskData;
            io.to(todoGroupId).emit('todoTaskAdded', taskData);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
}

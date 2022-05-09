using Microsoft.AspNetCore.SignalR;

namespace JustChat.Hubs
{
    public class ChatHub : Hub
    {
        //Enter the room
        public Task JoinRoom(string room)
        {

           
            return Groups.AddToGroupAsync(Context.ConnectionId, room);
        }
        //Leave the room
        public Task LeaveRoom(string room)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, room);
        }
        //To All
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        //To group
        public async Task SendGroupMessage(string room,string user, string message)
        {
            await Clients.Group(room).SendAsync("ReceiveMessage", user, message);
        }


    }
}
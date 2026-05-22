using System.Threading.Tasks;
using ConstruSoftTicket.Application.DTOs;

namespace ConstruSoftTicket.Application.Interfaces;

public interface IAuthService
{
    Task<string> RegistrarAsync(RegistrarUsuarioDto dto);
    Task<string> LoginAsync(LoginDto dto);
}
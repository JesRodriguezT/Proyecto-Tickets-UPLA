using BCrypt.Net;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Application.DTOs;
using ConstruSoftTicket.Domain.Entities;

namespace ConstruSoftTicket.Application.Services;

public class AuthService : IAuthService
{
    private readonly IApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public Guid Id { get; set; }

    public AuthService(IApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<string> RegistrarAsync(RegistrarUsuarioDto dto)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var nuevoUsuario = new Usuario
        {
            Username = dto.Username,
            PasswordHash = passwordHash,
            Rol = dto.Rol
        };

        _context.Usuarios.Add(nuevoUsuario);
        await Task.Run(() => _context.SaveChanges()); 

        return "Usuario registrado correctamente.";
    }

    public async Task<string> LoginAsync(LoginDto dto)
    {
        var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Username == dto.Username);
        
        if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Password, usuario.PasswordHash))
        {
            throw new System.Exception("Credenciales incorrectas.");
        }

        return GenerarTokenJwt(usuario);
    }

    private string GenerarTokenJwt(Usuario usuario)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        string secretKey = _configuration["Jwt:Secret"] ?? "EstaEsUnaClaveSuperSecretaUPLA2026!";
        var llave = Encoding.ASCII.GetBytes(secretKey); 

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, usuario.Username),
                new Claim(ClaimTypes.Role, usuario.Rol)
            }),
            Expires = System.DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(llave), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
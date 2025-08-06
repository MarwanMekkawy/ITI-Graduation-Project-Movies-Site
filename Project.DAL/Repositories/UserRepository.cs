﻿using Microsoft.EntityFrameworkCore;
using Project.DAL.Data;
using Project.DAL.Interfaces;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ProjectDbContext context) : base(context) { }
        public async Task<User?> GetByEmailAsync(string email) =>
       await _dbSet.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());

        public async Task<User?> GetByUsernameAsync(string username) =>
            await _dbSet.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

        public async Task<bool> EmailExistsAsync(string email) =>
            await _dbSet.AnyAsync(u => u.Email.ToLower() == email.ToLower());

        public async Task<bool> UsernameExistsAsync(string username) =>
            await _dbSet.AnyAsync(u => u.Username.ToLower() == username.ToLower());
    }

}

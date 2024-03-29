﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LearnNetCoreAPIReact02.Models;
using LearnNetCoreAPIReact02.Dtos.Pagination;
using LearnNetCoreAPIReact02.Dtos;
using System.Text.Json;
using LearnNetCoreAPIReact02.Wrapper;
using LearnNetCoreAPIReact02.Service;

namespace LearnNetCoreAPIReact02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IUriService uriService;

        public ContactsController(DatabaseContext context, IUriService uriService)
        {
            _context = context;
            this.uriService = uriService;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        /**
         * Pagination Method 1
         */
        // GET: api/Contacts
        /*[HttpGet("pagination")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContactsPagination([FromQuery] PaginationParams @params)
        {
            *//* return await _context.Contacts.ToListAsync();*//*

            var contacts =  _context.Contacts
                .OrderBy(p => p.Id);

            var paginationMetaData = new PaginationMetaData(contacts.Count(), @params.PageNumber, @params.PageSize);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetaData));

            var items = await contacts.Skip((@params.PageNumber -1) * @params.PageSize)
                .Take(@params.PageSize)
                .ToListAsync();


            return Ok(items.Select(e => new ContactDto
            {
                Id = e.Id,
                FirstName = e.FirstName,
                LastName = e.LastName,
            }));
        }*/

        /**
         * Pagination by Cursor Method
         */
        /*[HttpGet("cursor/pagination")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContactsPageByCursorParams([FromQuery] CursorParams @params)
        {
            *//* return await _context.Contacts.ToListAsync();*//*

            var contacts = await _context.Contacts
                .OrderBy(p => p.Id)
                .Take(@params.Count)
                .ToListAsync();

            var nextCursor = contacts.Any() ? contacts.LastOrDefault()?.Id : 0;

            Response.Headers.Add("X-Pagination", $"Next  Cursor ={nextCursor}");


            return Ok(contacts.Select(e => new ContactDto
            {
                Id = e.Id,
                FirstName = e.FirstName,
                LastName = e.LastName,
            }));
        }*/

        /**
         * Pagination by Method 3 (full response for using fe framework)
         */
        [HttpGet("fulRes/pagination")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContactsPageFulRes([FromQuery] PaginationParams @params)
        {
            /* return await _context.Contacts.ToListAsync();*/
            var route = Request.Path.Value;

            var validFilter = new PaginationParams(@params.PageNumber, @params.PageSize);

            var contacts = _context.Contacts
                           .OrderBy(p => p.Id);

            var paginationMetaData = new PaginationMetaData(contacts.Count(), @params.PageNumber, @params.PageSize);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetaData));

            var items = await contacts.Skip((@params.PageNumber - 1) * @params.PageSize)
                .Take(@params.PageSize)
                .ToListAsync();

            var tottalRecords = await _context.Contacts.CountAsync();

            var pagedResponse = PaginationHelper.CreatePagedReponse<Contact>(items, validFilter, tottalRecords, uriService, route);

            /*  return Ok(new PagedResponse<List<Contact>>(items, validFilter.PageNumber, validFilter.PageSize, tottalRecords));*/

            return Ok(pagedResponse);
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
        }

        //add list data
        [HttpPost("addListData")]
        public async Task<ActionResult<Contact>> PostListContact(List<Contact> listContact)
        {

            foreach (Contact c in listContact)
            {
                c.Id = 0;
                _context.Contacts.Add(c);
            }
            await _context.SaveChangesAsync();

            List<Contact> listResponse = new List<Contact>();
            listResponse.Clear();

            foreach (Contact c in listContact)
            {
                var id = c.Id;
                var firstName = c.FirstName;
                var lastName = c.LastName;
                Contact contact = new Contact();
                contact.Id = id;
                contact.FirstName = firstName;
                contact.LastName = lastName;
                listResponse.Add(contact);
            }

            return Ok(listResponse);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Find contacts by firstName
        [HttpGet("findLike")]
        public async Task<IActionResult> GetContactByFirstName([FromQuery] string firstName)
        {
            var result = await _context.Contacts.Where(x => x.FirstName.Contains(firstName)).ToListAsync();
            if (result != null)
            {
                return Ok(result);
            }

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
    }
}

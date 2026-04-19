-- Create the storage bucket for member documents if it doesn't exist
insert into storage.buckets (id, name, public)
values ('member_documents', 'member_documents', true)
on conflict (id) do nothing;

-- Give public access to read documents 
create policy "Public Access to member_documents"
on storage.objects for select
to public
using ( bucket_id = 'member_documents' );

-- Allow public uploads to the bucket since anonymous applicants are uploading documents
create policy "Allow public uploads to member_documents"
on storage.objects for insert
to public
with check ( bucket_id = 'member_documents' );

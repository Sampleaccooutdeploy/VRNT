-- =====================================================
-- Add 10 Sample Students to VRNT Database
-- =====================================================
-- Copy and paste this entire script into Supabase SQL Editor
-- Click "Run" to add all students at once
-- =====================================================

INSERT INTO public.students_vrnt (
  uid, name_aadhar, mobile_number, email_id, email_address, 
  aadhaar_number, address, date_of_birth, father_name,
  vedham, shaka, gothram, soothram, certified_in,
  year_of_certification, school, veda_adhyapakar_name, category
) VALUES

-- Student 1: Ramakrishna Sharma
('VRNT001', 'Ramakrishna Sharma', '+91 98400 12345', 'ramakrishna.sharma@example.com', 
 'ramakrishna.sharma@example.com', '1234 5678 9012', '12, Brahmin Street, Mylapore, Chennai - 600004',
 '2005-03-15', 'Venkatesh Sharma', 'Yajur Veda', 'Krishna Yajur Veda', 'Bharadwaja', 
 'Apastamba', 'Krishna Yajur Veda - Ghana Patha', '2023', 'Sri Veda Patasala, Mylapore',
 'Pandita Subramaniam Dikshitar', 'P'),

-- Student 2: Varadharajan Iyer
('VRNT002', 'Varadharajan Iyer', '+91 98401 23456', 'varadharajan.iyer@example.com',
 'varadharajan.iyer@example.com', '2345 6789 0123', '45, Sannidhi Street, Kumbakonam - 612001',
 '2006-07-22', 'Krishnamurthy Iyer', 'Rig Veda', 'Sakala Sakha', 'Kashyapa',
 'Asvalayana', 'Rig Veda - Pada Patha', '2024', 'Kumbakonam Veda Patasala',
 'Sri Rangaswamy Dikshitar', 'P'),

-- Student 3: Narayanan Bhattar
('VRNT003', 'Narayanan Bhattar', '+91 98402 34567', 'narayanan.bhattar@example.com',
 'narayanan.bhattar@example.com', '3456 7890 1234', '78, Agraharam Street, Srirangam - 620006',
 '2004-11-05', 'Srinivasan Bhattar', 'Sama Veda', 'Kauthuma', 'Atri',
 'Drahyayana', 'Sama Veda - Krama Patha', '2023', 'Srirangam Sri Ranganatha Veda Patasala',
 'Vidwan Parthasarathy Bhattar', 'P'),

-- Student 4: Govindarajan Sastri
('VRNT004', 'Govindarajan Sastri', '+91 98403 45678', 'govindarajan.sastri@example.com',
 'govindarajan.sastri@example.com', '4567 8901 2345', '23, Temple Street, Kanchipuram - 631501',
 '2005-09-18', 'Ramakrishna Sastri', 'Yajur Veda', 'Taittiriya', 'Viswamitra',
 'Bodhayana', 'Krishna Yajur Veda - Krama Patha', '2024', 'Kanchi Kamakoti Veda Patasala',
 'Mahavidwan Sankara Dikshitar', 'P'),

-- Student 5: Srinivasan Iyengar
('VRNT005', 'Srinivasan Iyengar', '+91 98404 56789', 'srinivasan.iyengar@example.com',
 'srinivasan.iyengar@example.com', '5678 9012 3456', '56, Agraharam, Melkote - 571431',
 '2006-01-30', 'Varadachari Iyengar', 'Yajur Veda', 'Krishna Yajur Veda', 'Jamadagni',
 'Apastamba', 'Taittiriya Samhita - Pada Patha', '2023', 'Melkote Veda Patasala',
 'Sri Vedanta Ramanuja Bhattar', 'N'),

-- Student 6: Mahadevan Dikshitar
('VRNT006', 'Mahadevan Dikshitar', '+91 98405 67890', 'mahadevan.dikshitar@example.com',
 'mahadevan.dikshitar@example.com', '6789 0123 4567', '34, Brahmin Street, Thanjavur - 613001',
 '2004-12-25', 'Subramaniam Dikshitar', 'Rig Veda', 'Bashkala', 'Gautama',
 'Asvalayana', 'Rig Veda - Ghana Patha', '2024', 'Thanjavur Saraswati Veda Patasala',
 'Pandita Ramachandra Dikshitar', 'P'),

-- Student 7: Krishnan Namboothiri
('VRNT007', 'Krishnan Namboothiri', '+91 98406 78901', 'krishnan.namboothiri@example.com',
 'krishnan.namboothiri@example.com', '7890 1234 5678', '12, Mana Street, Thrissur - 680001',
 '2005-05-14', 'Narayanan Namboothiri', 'Rig Veda', 'Sakala Sakha', 'Kaundinya',
 'Asvalayana', 'Rig Veda - Pada Patha', '2023', 'Kerala Veda Patashala, Thrissur',
 'Vidwan Krishnan Namboothiri', 'N'),

-- Student 8: Venkatesan Sharma
('VRNT008', 'Venkatesan Sharma', '+91 98407 89012', 'venkatesan.sharma@example.com',
 'venkatesan.sharma@example.com', '8901 2345 6789', '89, Temple Road, Tirupati - 517501',
 '2006-08-20', 'Ramanuja Sharma', 'Yajur Veda', 'Taittiriya', 'Angirasa',
 'Bodhayana', 'Krishna Yajur Veda - Samhita Patha', '2024', 'Tirupati Sri Venkateswara Veda Patasala',
 'Sri Ranganatha Bhattar', 'P'),

-- Student 9: Raghavan Iyengar
('VRNT009', 'Raghavan Iyengar', '+91 98408 90123', 'raghavan.iyengar@example.com',
 'raghavan.iyengar@example.com', '9012 3456 7890', '67, Sannidhi Street, Udupi - 576101',
 '2005-02-28', 'Madhavan Iyengar', 'Sama Veda', 'Jaiminiya', 'Vatsya',
 'Drahyayana', 'Sama Veda - Pada Patha', '2023', 'Udupi Krishna Mutt Veda Patasala',
 'Vidwan Gopala Bhattar', 'N'),

-- Student 10: Ananthapadmanabhan Iyer
('VRNT010', 'Ananthapadmanabhan Iyer', '+91 98409 01234', 'ananthapadmanabhan@example.com',
 'ananthapadmanabhan@example.com', '0123 4567 8901', '101, Vedic Avenue, Thiruvananthapuram - 695001',
 '2004-06-10', 'Padmanabhan Iyer', 'Yajur Veda', 'Krishna Yajur Veda', 'Harita',
 'Apastamba', 'Krishna Yajur Veda - Ghana Patha', '2024', 'Thiruvananthapuram Vedic Institute',
 'Mahavidwan Sridhara Dikshitar', 'P')

ON CONFLICT (uid) DO NOTHING;

-- Verify the students were added
SELECT 
  uid, 
  name_aadhar, 
  vedham, 
  certified_in, 
  year_of_certification,
  category
FROM public.students_vrnt 
WHERE uid LIKE 'VRNT%'
ORDER BY uid;

-- =====================================================
-- Success Message
-- =====================================================
-- If you see 10 rows above, all students were added successfully!
-- You can now search for them in the app using UIDs: VRNT001 to VRNT010
-- =====================================================

package com.juaracoding.ujian.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.ujian.model.Buku;
import com.juaracoding.ujian.model.Peminjam;
import com.juaracoding.ujian.repository.BukuRepository;
import com.juaracoding.ujian.repository.PeminjamRepository;

@RestController
@RequestMapping("/peminjam")
public class PeminjamController {

	@Autowired
	PeminjamRepository peminjamRepo;

	@GetMapping("/")
	public List<Peminjam> getAll(){
		return peminjamRepo.findAll();
	}
	
	
	@PostMapping("/")
	public String addPeminjam(@RequestBody Peminjam peminjam){
		
		peminjamRepo.save(peminjam);
		return "Berhasil memasukan data";
	}
}

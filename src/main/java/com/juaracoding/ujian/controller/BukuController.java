package com.juaracoding.ujian.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.ujian.model.Buku;
import com.juaracoding.ujian.repository.BukuRepository;

@RestController
@RequestMapping("/buku")
public class BukuController {

	@Autowired
	BukuRepository bukuRepo;

	@GetMapping("/")
	public List<Buku> getAll(){
		return bukuRepo.findAll();
	}
	
	
	@PostMapping("/")
	public String addBuku(@RequestBody Buku buku){
		
		bukuRepo.save(buku);
		return "Berhasil memasukan data";
	}
}	
package com.juaracoding.ujian.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.juaracoding.ujian.model.Jodoh;
import com.juaracoding.ujian.model.User;
import com.juaracoding.ujian.repository.JodohRepository;
import com.juaracoding.ujian.utility.FileUtility;

@RestController
@RequestMapping("/jodoh")
public class JodohController {

	@Autowired
	JodohRepository jodohRepo;

	@GetMapping("/calon/{iduser}")
	public List<Jodoh> searchCalonGender(@PathVariable("iduser")int iduser) {
		
		return jodohRepo.findByTarget(iduser);
	}
	
	
	@PostMapping("/")
	public String addJodoh(@RequestBody Jodoh jodoh){
		
		jodohRepo.save(jodoh);
		return "Berhasil memasukan data";
	}
}	

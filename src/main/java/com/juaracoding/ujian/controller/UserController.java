package com.juaracoding.ujian.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.juaracoding.ujian.model.User;
import com.juaracoding.ujian.repository.UserRepository;
import com.juaracoding.ujian.utility.FileUtility;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserRepository userRepo;

	@GetMapping("/")
	public List<User> getAll(){
		return userRepo.findAll();
	}

	@GetMapping("/login")
	public User loginUser(@RequestParam("username")String username, @RequestParam("nohp") String nohp) {
		return userRepo.findByLogin(username, nohp);
	}
	
	@GetMapping("/gender/{gender}")
	public List<User> searchCalonGender(@PathVariable("gender")String gender) {
		String genderTarget="";
		if(gender.equalsIgnoreCase("male")) {
			genderTarget="female";
		}else {
			genderTarget="male";
		}
		return userRepo.findByGender(genderTarget);
	}
	
	@PostMapping("/")
	public String addUser(@RequestParam(value = "file") MultipartFile images,@ModelAttribute(value="data")String dataJSON) throws IOException{
		String fileName = StringUtils.cleanPath(images.getOriginalFilename());
		
		String uploadDir = "src/main/java/user-photo/";
		FileUtility.saveFile(uploadDir, fileName, images);
		User user= new Gson().fromJson(dataJSON, User.class);
		
		user.setImage(fileName);
		userRepo.save(user);
		return "Berhasil memasukan data";
	}
	
	@GetMapping(value = "/image/{name}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String name) throws IOException {
	   final InputStream in = getClass().getResourceAsStream("/user-photo/"+name);
	   return IOUtils.toByteArray(in);
	}
}

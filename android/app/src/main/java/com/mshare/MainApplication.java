package com.mshare;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;

import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.venepe.RNMusicMetadata.RNMusicMetadataPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import expo.adapters.react.ModuleRegistryAdapter;
import expo.adapters.react.ReactAdapterPackage;
import expo.adapters.react.ReactModuleRegistryProvider;
import expo.core.interfaces.Package;
import expo.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.filesystem.FileSystemPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.medialibrary.MediaLibraryPackage;

import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import java.io.Console;
import 	java.security.MessageDigest;

import android.content.pm.Signature;
import android.util.Log;
import 	android.util.Base64;
import 	android.content.pm.PackageManager.NameNotFoundException;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.<Package>asList(
     new ReactAdapterPackage(),
     new ConstantsPackage(),
     new PermissionsPackage(),
     new FileSystemPackage(),
     new MediaLibraryPackage()
  ), Arrays.<SingletonModule>asList());

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
     return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseStoragePackage(),
            new RNFirebaseDatabasePackage(),
            new FBSDKPackage(mCallbackManager),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new RNMusicMetadataPackage(),
            new TrackPlayer(),
            new VectorIconsPackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
    // try {
    //   PackageInfo info = getPackageManager().getPackageInfo(
    //                     "com.facebook.android",
    //                     PackageManager.GET_SIGNATURES);
    //   for (Signature signature : info.signatures) {
    //       MessageDigest md = MessageDigest.getInstance("SHA");
    //       md.update(signature.toByteArray());
    //       Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
    //       }
    //   } catch (NameNotFoundException e) {

    //   } ;
    try {
      PackageInfo info = getPackageManager().getPackageInfo(
              getPackageName(), PackageManager.GET_SIGNATURES);
              Log.d("RAJAT",info.toString());
       for (Signature signature : info.signatures) {
           MessageDigest md = MessageDigest.getInstance("SHA");
           md.update(signature.toByteArray());
           Log.d("RAJAT",
                   "KeyHash: "
                          + Base64.encodeToString(md.digest(),
                                  Base64.DEFAULT));
       }
  } catch (NameNotFoundException e) {
  } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
  }
}
